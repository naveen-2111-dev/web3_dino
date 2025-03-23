// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title DinoDao
 * @dev A decentralized betting contract where players stake tokens based on the 
 * distance they expect to run. If they meet or exceed the target, they receive 
 * a reward. If they fail, their bet goes to the DAO treasury.
 */
contract DinoDao {
    /**
     * @dev Struct to store player's bet details.
     * @param distance The target distance the player aims to achieve.
     * @param bet The amount of ETH the player has bet.
     */
    struct Dino {
        uint256 distance; 
        uint256 bet;    
    }

    /// @notice Address of the DAO treasury that collects lost bets.
    address public daoTreasury; 

    /// @notice Mapping to track players' bets.
    mapping(address => Dino) public players; 

    /// @notice Event emitted when a player stakes tokens.
    /// @param player The address of the player.
    /// @param distance The target distance set by the player.
    /// @param bet The amount of ETH staked.
    event TokensStaked(address indexed player, uint256 distance, uint256 bet);

    /// @notice Event emitted when a player successfully completes the run.
    /// @param player The address of the player.
    /// @param extraDistance The extra distance the player ran beyond the target.
    /// @param reward The reward amount paid to the player.
    event RewardPaid(address indexed player, uint256 extraDistance, uint256 reward);

    /// @notice Event emitted when a player fails to reach the target distance.
    /// @param player The address of the player.
    /// @param targetDistance The distance the player aimed to reach.
    /// @param actualDistance The actual distance the player achieved.
    /// @param lostBet The bet amount lost to the DAO treasury.
    event Failed(address indexed player, uint256 targetDistance, uint256 actualDistance, uint256 lostBet);

    /// @dev Initializes the contract and sets the deployer as the DAO treasury.
    constructor() {
        daoTreasury = msg.sender; 
    }

    /**
     * @notice Allows players to stake ETH and set a target distance.
     * @dev Players must specify a positive distance and send ETH as a bet.
     * @param _distance The distance the player wants to achieve.
     */
    function stakeTokens(uint256 _distance) public payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(_distance > 0, "Distance must be greater than 0");

        players[msg.sender] = Dino(_distance, msg.value);

        emit TokensStaked(msg.sender, _distance, msg.value);
    }

    /**
     * @notice Completes the player's run and determines if they win or lose.
     * @dev If the player fails, the bet is transferred to the DAO treasury. 
     * If they succeed, they receive their bet back plus a reward.
     * @param _actualDistance The distance the player actually achieved.
     */
    function completeRun(uint256 _actualDistance) public {
        require(players[msg.sender].bet > 0, "No active bet found");

        uint256 targetDistance = players[msg.sender].distance;
        uint256 betAmount = players[msg.sender].bet;

        if (_actualDistance < targetDistance) {
            payable(daoTreasury).transfer(betAmount);
            emit Failed(msg.sender, targetDistance, _actualDistance, betAmount);
            delete players[msg.sender]; 
            return;
        }

        uint256 extraDistance = _actualDistance - targetDistance;
        uint256 reward = (extraDistance / 100) * 0.01 ether;
        uint256 totalPayout = betAmount + reward;

        if (address(this).balance >= totalPayout) {
            payable(msg.sender).transfer(totalPayout);
            emit RewardPaid(msg.sender, extraDistance, reward);
        }

        delete players[msg.sender];
    }

    /// @notice Allows the contract to receive ETH.
    receive() external payable {}
} 
