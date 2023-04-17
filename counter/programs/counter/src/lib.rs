#![allow(unused_imports)]
#![allow(unused_variables)]
#![allow(unused_mut)]

pub mod dot;

use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::{self, AssociatedToken},
    token::{self, Mint, Token, TokenAccount},
};

use dot::program::*;
use std::{cell::RefCell, rc::Rc};

declare_id!("C8ZXZXQuCKidMC1bjQduPjvSmkZqTBXukZbVxmGc9JAR");

pub mod seahorse_util {
    use super::*;

    #[cfg(feature = "pyth-sdk-solana")]
    pub use pyth_sdk_solana::{load_price_feed_from_account_info, PriceFeed};
    use std::{collections::HashMap, fmt::Debug, ops::Deref};

    pub struct Mutable<T>(Rc<RefCell<T>>);

    impl<T> Mutable<T> {
        pub fn new(obj: T) -> Self {
            Self(Rc::new(RefCell::new(obj)))
        }
    }

    impl<T> Clone for Mutable<T> {
        fn clone(&self) -> Self {
            Self(self.0.clone())
        }
    }

    impl<T> Deref for Mutable<T> {
        type Target = Rc<RefCell<T>>;

        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }

    impl<T: Debug> Debug for Mutable<T> {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            write!(f, "{:?}", self.0)
        }
    }

    impl<T: Default> Default for Mutable<T> {
        fn default() -> Self {
            Self::new(T::default())
        }
    }

    impl<T: Clone> Mutable<Vec<T>> {
        pub fn wrapped_index(&self, mut index: i128) -> usize {
            if index >= 0 {
                return index.try_into().unwrap();
            }

            index += self.borrow().len() as i128;

            return index.try_into().unwrap();
        }
    }

    impl<T: Clone, const N: usize> Mutable<[T; N]> {
        pub fn wrapped_index(&self, mut index: i128) -> usize {
            if index >= 0 {
                return index.try_into().unwrap();
            }

            index += self.borrow().len() as i128;

            return index.try_into().unwrap();
        }
    }

    #[derive(Clone)]
    pub struct Empty<T: Clone> {
        pub account: T,
        pub bump: Option<u8>,
    }

    #[derive(Clone, Debug)]
    pub struct ProgramsMap<'info>(pub HashMap<&'static str, AccountInfo<'info>>);

    impl<'info> ProgramsMap<'info> {
        pub fn get(&self, name: &'static str) -> AccountInfo<'info> {
            self.0.get(name).unwrap().clone()
        }
    }

    #[derive(Clone, Debug)]
    pub struct WithPrograms<'info, 'entrypoint, A> {
        pub account: &'entrypoint A,
        pub programs: &'entrypoint ProgramsMap<'info>,
    }

    impl<'info, 'entrypoint, A> Deref for WithPrograms<'info, 'entrypoint, A> {
        type Target = A;

        fn deref(&self) -> &Self::Target {
            &self.account
        }
    }

    pub type SeahorseAccount<'info, 'entrypoint, A> =
        WithPrograms<'info, 'entrypoint, Box<Account<'info, A>>>;

    pub type SeahorseSigner<'info, 'entrypoint> = WithPrograms<'info, 'entrypoint, Signer<'info>>;

    #[derive(Clone, Debug)]
    pub struct CpiAccount<'info> {
        #[doc = "CHECK: CpiAccounts temporarily store AccountInfos."]
        pub account_info: AccountInfo<'info>,
        pub is_writable: bool,
        pub is_signer: bool,
        pub seeds: Option<Vec<Vec<u8>>>,
    }

    #[macro_export]
    macro_rules! assign {
        ($ lval : expr , $ rval : expr) => {{
            let temp = $rval;

            $lval = temp;
        }};
    }

    #[macro_export]
    macro_rules! index_assign {
        ($ lval : expr , $ idx : expr , $ rval : expr) => {
            let temp_rval = $rval;
            let temp_idx = $idx;

            $lval[temp_idx] = temp_rval;
        };
    }
}

#[program]
mod counter {
    use super::*;
    use seahorse_util::*;
    use std::collections::HashMap;

    #[derive(Accounts)]
    pub struct Decrement<'info> {
        #[account(mut)]
        pub user: Signer<'info>,
        #[account(mut)]
        pub counter: Box<Account<'info, dot::program::Counter>>,
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let mut programs = HashMap::new();
        let programs_map = ProgramsMap(programs);
        let user = SeahorseSigner {
            account: &ctx.accounts.user,
            programs: &programs_map,
        };

        let counter = dot::program::Counter::load(&mut ctx.accounts.counter, &programs_map);

        decrement_handler(user.clone(), counter.clone());

        dot::program::Counter::store(counter);

        return Ok(());
    }

    #[derive(Accounts)]
    pub struct Reset<'info> {
        #[account(mut)]
        pub user: Signer<'info>,
        #[account(mut)]
        pub counter: Box<Account<'info, dot::program::Counter>>,
    }

    pub fn reset(ctx: Context<Reset>) -> Result<()> {
        let mut programs = HashMap::new();
        let programs_map = ProgramsMap(programs);
        let user = SeahorseSigner {
            account: &ctx.accounts.user,
            programs: &programs_map,
        };

        let counter = dot::program::Counter::load(&mut ctx.accounts.counter, &programs_map);

        reset_handler(user.clone(), counter.clone());

        dot::program::Counter::store(counter);

        return Ok(());
    }

    #[derive(Accounts)]
    # [instruction (counter_bump : u8)]
    pub struct Create<'info> {
        # [account (init , space = std :: mem :: size_of :: < dot :: program :: Counter > () + 8 , payer = user , seeds = ["counter" . as_bytes () . as_ref () , user . key () . as_ref ()] , bump)]
        pub counter: Box<Account<'info, dot::program::Counter>>,
        #[account(mut)]
        pub user: Signer<'info>,
        pub system_program: Program<'info, System>,
        pub rent: Sysvar<'info, Rent>,
    }

    pub fn create(ctx: Context<Create>, counter_bump: u8) -> Result<()> {
        let mut programs = HashMap::new();

        programs.insert(
            "system_program",
            ctx.accounts.system_program.to_account_info(),
        );

        let programs_map = ProgramsMap(programs);
        let counter = Empty {
            account: dot::program::Counter::load(&mut ctx.accounts.counter, &programs_map),
            bump: ctx.bumps.get("counter").map(|bump| *bump),
        };

        let user = SeahorseSigner {
            account: &ctx.accounts.user,
            programs: &programs_map,
        };

        create_handler(counter.clone(), user.clone(), counter_bump);

        dot::program::Counter::store(counter.account);

        return Ok(());
    }

    #[derive(Accounts)]
    pub struct Increment<'info> {
        #[account(mut)]
        pub user: Signer<'info>,
        #[account(mut)]
        pub counter: Box<Account<'info, dot::program::Counter>>,
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let mut programs = HashMap::new();
        let programs_map = ProgramsMap(programs);
        let user = SeahorseSigner {
            account: &ctx.accounts.user,
            programs: &programs_map,
        };

        let counter = dot::program::Counter::load(&mut ctx.accounts.counter, &programs_map);

        increment_handler(user.clone(), counter.clone());

        dot::program::Counter::store(counter);

        return Ok(());
    }
}
