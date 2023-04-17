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
    pub owner: Pubkey,
    pub count: i64,
}

impl<'info, 'entrypoint> Counter {
    pub fn load(
        account: &'entrypoint mut Box<Account<'info, Self>>,
        programs_map: &'entrypoint ProgramsMap<'info>,
    ) -> Mutable<LoadedCounter<'info, 'entrypoint>> {
        let owner = account.owner.clone();
        let count = account.count;

        Mutable::new(LoadedCounter {
            __account__: account,
            __programs__: programs_map,
            owner,
            count,
        })
    }

    pub fn store(loaded: Mutable<LoadedCounter>) {
        let mut loaded = loaded.borrow_mut();
        let owner = loaded.owner.clone();

        loaded.__account__.owner = owner;

        let count = loaded.count;

        loaded.__account__.count = count;
    }
}

#[derive(Debug)]
pub struct LoadedCounter<'info, 'entrypoint> {
    pub __account__: &'entrypoint mut Box<Account<'info, Counter>>,
    pub __programs__: &'entrypoint ProgramsMap<'info>,
    pub owner: Pubkey,
    pub count: i64,
}

pub fn increment_counter_handler<'info>(
    mut owner: SeahorseSigner<'info, '_>,
    mut counter: Mutable<LoadedCounter<'info, '_>>,
) -> () {
    solana_program::msg!(
        "{:?} {} {:?}",
        owner.key(),
        "is incrementing",
        counter.borrow().__account__.key()
    );

    if !(owner.key() == counter.borrow().owner) {
        panic!("This is not your counter!");
    }

    assign!(counter.borrow_mut().count, counter.borrow().count + 1);

    solana_program::msg!(
        "{} {:?} {} {}",
        "Count for",
        counter.key,
        "is",
        counter.borrow().count
    );
}

pub fn reset_counter_handler<'info>(
    mut owner: SeahorseSigner<'info, '_>,
    mut counter: Mutable<LoadedCounter<'info, '_>>,
) -> () {
    solana_program::msg!(
        "{:?} {} {:?}",
        owner.key(),
        "is resetting",
        counter.borrow().__account__.key()
    );

    if !(owner.key() == counter.borrow().owner) {
        panic!("This is not your counter!");
    }

    assign!(counter.borrow_mut().count, 0);
}

pub fn init_counter_handler<'info>(
    mut owner: SeahorseSigner<'info, '_>,
    mut counter: Empty<Mutable<LoadedCounter<'info, '_>>>,
) -> () {
    let mut counter = counter.account.clone();

    assign!(counter.borrow_mut().owner, owner.key());

    solana_program::msg!(
        "{:?} {} {:?}",
        owner.key(),
        "initialised",
        counter.borrow().__account__.key()
    );
}

pub fn decrement_counter_handler<'info>(
    mut owner: SeahorseSigner<'info, '_>,
    mut counter: Mutable<LoadedCounter<'info, '_>>,
) -> () {
    solana_program::msg!(
        "{:?} {} {:?}",
        owner.key(),
        "is decrementing",
        counter.borrow().__account__.key()
    );

    if !(owner.key() == counter.borrow().owner) {
        panic!("This is not your counter!");
    }

    assign!(counter.borrow_mut().count, counter.borrow().count - 1);

    solana_program::msg!(
        "{} {:?} {} {}",
        "Count for",
        counter.key,
        "is",
        counter.borrow().count
    );
}
