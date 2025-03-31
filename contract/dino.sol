// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DinoDao is Ownable {
    struct DinoRun {
        uint256 distance;
        uint256 bet;
        uint256 timestamp;
    }

    IERC20 public dinoToken;
    address public daoTreasury;
    uint256 public rewardMultiplier = 100;

    mapping(address => DinoRun) public players;
    mapping(address => uint256) public totalRewards;

    event TokensStaked(
        address indexed player,
        uint256 distance,
        uint256 amount
    );
    event RewardPaid(address indexed player, uint256 reward, uint256 bonus);
    event RunFailed(address indexed player, uint256 lostAmount);
    event TreasuryUpdated(address newTreasury);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        dinoToken = IERC20(_tokenAddress);
        daoTreasury = msg.sender;
    }

    function stakeTokens(uint256 _distance, uint256 _amount) external {
        require(_distance > 0, "Invalid distance");
        require(_amount > 0, "Invalid amount");

        dinoToken.transferFrom(msg.sender, address(this), _amount);
        players[msg.sender] = DinoRun(_distance, _amount, block.timestamp);

        emit TokensStaked(msg.sender, _distance, _amount);
    }

    function completeRun(uint256 _actualDistance) external {
        DinoRun memory run = players[msg.sender];
        require(run.bet > 0, "No active run");

        uint256 reward = 0;
        uint256 bonus = 0;

        if (_actualDistance >= run.distance) {
            reward = run.bet;

            uint256 extraDistance = _actualDistance - run.distance;
            bonus = (extraDistance * rewardMultiplier * run.bet) / 10000;

            uint256 timeElapsed = (block.timestamp - run.timestamp) / 60;
            uint256 timeBonus = (run.bet * timeElapsed) / 100;

            uint256 totalPayout = reward + bonus + timeBonus;

            require(
                dinoToken.balanceOf(address(this)) >= totalPayout,
                "Insufficient contract balance"
            );

            dinoToken.transfer(msg.sender, totalPayout);
            totalRewards[msg.sender] += totalPayout;

            emit RewardPaid(msg.sender, reward, bonus + timeBonus);
        } else {
            uint256 daoShare = (run.bet * 90) / 100;
            uint256 userRefund = run.bet - daoShare;

            dinoToken.transfer(daoTreasury, daoShare);
            dinoToken.transfer(msg.sender, userRefund);

            emit RunFailed(msg.sender, daoShare);
        }

        delete players[msg.sender];
    }

    function setTreasury(address _newTreasury) external onlyOwner {
        daoTreasury = _newTreasury;
        emit TreasuryUpdated(_newTreasury);
    }

    function setRewardMultiplier(uint256 _multiplier) external onlyOwner {
        require(_multiplier <= 1000, "Multiplier too high");
        rewardMultiplier = _multiplier;
    }

    function withdrawExcessTokens(uint256 _amount) external onlyOwner {
        require(
            dinoToken.balanceOf(address(this)) >= _amount,
            "Insufficient balance"
        );
        dinoToken.transfer(daoTreasury, _amount);
    }

    function getUserStats(
        address _user
    )
        external
        view
        returns (
            uint256 currentStake,
            uint256 targetDistance,
            uint256 totalEarned
        )
    {
        DinoRun memory run = players[_user];
        return (run.bet, run.distance, totalRewards[_user]);
    }
}
