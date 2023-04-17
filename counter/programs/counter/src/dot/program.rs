#![allow(unused_imports)]
#![allow(unused_variables)]
#![allow(unused_mut)]
use crate::{assign, index_assign, seahorse_util::*};
use anchor_lang::{prelude::*, solana_program};
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use std::{cell::RefCell, rc::Rc};

#[account]
#[derive(Debug)]
pub struct Counter {
    pub count: u64,
    pub bump: u8,
    pub user: Pubkey,
}

impl<'info, 'entrypoint> Counter {
    pub fn load(
        account: &'entrypoint mut Box<Account<'info, Self>>,
        programs_map: &'entrypoint ProgramsMap<'info>,
    ) -> Mutable<LoadedCounter<'info, 'entrypoint>> {
        let count = account.count;
        let bump = account.bump;
        let user = account.user.clone();

        Mutable::new(LoadedCounter {
            __account__: account,
            __programs__: programs_map,
            count,
            bump,
            user,
        })
    }

    pub fn store(loaded: Mutable<LoadedCounter>) {
        let mut loaded = loaded.borrow_mut();
        let count = loaded.count;

        loaded.__account__.count = count;

        let bump = loaded.bump;

        loaded.__account__.bump = bump;

        let user = loaded.user.clone();

        loaded.__account__.user = user;
    }
}

#[derive(Debug)]
pub struct LoadedCounter<'info, 'entrypoint> {
    pub __account__: &'entrypoint mut Box<Account<'info, Counter>>,
    pub __programs__: &'entrypoint ProgramsMap<'info>,
    pub count: u64,
    pub bump: u8,
    pub user: Pubkey,
}

pub fn decrement_handler<'info>(
    mut user: SeahorseSigner<'info, '_>,
    mut counter: Mutable<LoadedCounter<'info, '_>>,
) -> () {
    if !(user.key() == counter.borrow().user) {
        panic!("Unauthorized");
    }

    assign!(counter.borrow_mut().count, counter.borrow().count - 1);
}

pub fn reset_handler<'info>(
    mut user: SeahorseSigner<'info, '_>,
    mut counter: Mutable<LoadedCounter<'info, '_>>,
) -> () {
    if !(user.key() == counter.borrow().user) {
        panic!("Unauthorized");
    }

    assign!(counter.borrow_mut().count, 0);
}

pub fn create_handler<'info>(
    mut counter: Empty<Mutable<LoadedCounter<'info, '_>>>,
    mut user: SeahorseSigner<'info, '_>,
    mut counter_bump: u8,
) -> () {
    let mut counter = counter.account.clone();

    assign!(counter.borrow_mut().user, user.key());
}

pub fn increment_handler<'info>(
    mut user: SeahorseSigner<'info, '_>,
    mut counter: Mutable<LoadedCounter<'info, '_>>,
) -> () {
    if !(user.key() == counter.borrow().user) {
        panic!("Unauthorized");
    }

    assign!(counter.borrow_mut().count, counter.borrow().count + 1);
}
