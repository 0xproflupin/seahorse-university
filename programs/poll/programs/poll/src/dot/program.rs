#![allow(unused_imports)]
#![allow(unused_variables)]
#![allow(unused_mut)]
use crate::{assign, index_assign, seahorse_util::*};
use anchor_lang::{prelude::*, solana_program};
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use std::{cell::RefCell, rc::Rc};

#[account]
#[derive(Debug)]
pub struct Poll {
    pub ethereum: u64,
    pub solana: u64,
    pub polygon: u64,
}

impl<'info, 'entrypoint> Poll {
    pub fn load(
        account: &'entrypoint mut Box<Account<'info, Self>>,
        programs_map: &'entrypoint ProgramsMap<'info>,
    ) -> Mutable<LoadedPoll<'info, 'entrypoint>> {
        let ethereum = account.ethereum;
        let solana = account.solana;
        let polygon = account.polygon;

        Mutable::new(LoadedPoll {
            __account__: account,
            __programs__: programs_map,
            ethereum,
            solana,
            polygon,
        })
    }

    pub fn store(loaded: Mutable<LoadedPoll>) {
        let mut loaded = loaded.borrow_mut();
        let ethereum = loaded.ethereum;

        loaded.__account__.ethereum = ethereum;

        let solana = loaded.solana;

        loaded.__account__.solana = solana;

        let polygon = loaded.polygon;

        loaded.__account__.polygon = polygon;
    }
}

#[derive(Debug)]
pub struct LoadedPoll<'info, 'entrypoint> {
    pub __account__: &'entrypoint mut Box<Account<'info, Poll>>,
    pub __programs__: &'entrypoint ProgramsMap<'info>,
    pub ethereum: u64,
    pub solana: u64,
    pub polygon: u64,
}

pub fn vote_handler<'info>(
    mut user: SeahorseSigner<'info, '_>,
    mut poll: Mutable<LoadedPoll<'info, '_>>,
    mut vote_op: String,
) -> () {
    if vote_op == "eth" {
        assign!(poll.borrow_mut().ethereum, poll.borrow().ethereum + 1);
    } else {
        if vote_op == "sol" {
            assign!(poll.borrow_mut().solana, poll.borrow().solana + 1);
        } else {
            if vote_op == "pol" {
                assign!(poll.borrow_mut().polygon, poll.borrow().polygon + 1);
            }
        }
    }
}

pub fn create_handler<'info>(
    mut poll: Empty<Mutable<LoadedPoll<'info, '_>>>,
    mut user: SeahorseSigner<'info, '_>,
) -> () {
    let mut poll = poll.account.clone();
}
