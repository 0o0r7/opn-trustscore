// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title TrustScoreRegistry
 * @notice On-chain registry for OPN TrustScore reputation data
 * @dev Stores wallet trust scores, badges, and metadata for the OPN ecosystem
 * 
 * This contract serves as the canonical source of truth for reputation data
 * across the OPN ecosystem. Protocols can query scores to implement
 * reputation-aware features like governance weighting, risk-adjusted lending,
 * and access control.
 * 
 * Built for the OPN Builder Programme Season 1.
 * Chain: OPN Testnet (Chain ID: 984)
 */

contract TrustScoreRegistry {
    
    // ============ Structs ============
    
    /**
     * @notice Complete trust score data for a wallet
     * @param score Overall trust score (0-100)
     * @param riskLevel Risk classification: "Low", "Medium", "High", "Critical"
     * @param issuer Address that issued/verified the score
     * @param timestamp When the score was last updated
     * @param metadataURI IPFS URI for extended score data (JSON)
     */
    struct TrustScore {
        uint256 score;
        string riskLevel;
        address issuer;
        uint256 timestamp;
        string metadataURI;
    }
    
    /**
     * @notice Badge earned by a wallet
     * @param badgeId Unique identifier for the badge type
     * @param name Human-readable badge name
     * @param tier Badge tier: "bronze", "silver", "gold", "platinum"
     * @param earned Whether the wallet has earned this badge
     * @param timestamp When the badge was awarded
     */
    struct Badge {
        string badgeId;
        string name;
        string tier;
        bool earned;
        uint256 timestamp;
    }
    
    // ============ State Variables ============
    
    /// @notice Contract owner with administrative privileges
    address public owner;
    
    /// @notice Authorized issuers who can write score data
    mapping(address => bool) public authorizedIssuers;
    
    /// @notice Trust scores by wallet address
    mapping(address => TrustScore) public trustScores;
    
    /// @notice Badges by wallet address and badge ID
    mapping(address => mapping(string => Badge)) public badges;
    
    /// @notice List of badge IDs available in the system
    string[] public badgeIds;
    
    /// @notice Whether a badge ID is registered
    mapping(string => bool) public registeredBadgeIds;
    
    /// @notice Total number of wallets scored
    uint256 public totalWalletsScored;
    
    /// @notice Contract version for upgrade tracking
    string public constant VERSION = "1.0.0";
    
    // ============ Events ============
    
    /// @notice Emitted when a trust score is updated
    event ScoreUpdated(
        address indexed wallet,
        uint256 score,
        string riskLevel,
        address indexed issuer,
        uint256 timestamp
    );
    
    /// @notice Emitted when a badge is awarded
    event BadgeAwarded(
        address indexed wallet,
        string badgeId,
        string name,
        string tier,
        uint256 timestamp
    );
    
    /// @notice Emitted when a badge is revoked
    event BadgeRevoked(
        address indexed wallet,
        string badgeId,
        uint256 timestamp
    );
    
    /// @notice Emitted when an issuer is authorized
    event IssuerAuthorized(address indexed issuer);
    
    /// @notice Emitted when an issuer is revoked
    event IssuerRevoked(address indexed issuer);
    
    /// @notice Emitted when a new badge type is registered
    event BadgeTypeRegistered(string badgeId, string name);
    
    // ============ Modifiers ============
    
    /// @notice Restricts function to contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "TrustScoreRegistry: caller is not owner");
        _;
    }
    
    /// @notice Restricts function to authorized issuers or owner
    modifier onlyIssuer() {
        require(
            authorizedIssuers[msg.sender] || msg.sender == owner,
            "TrustScoreRegistry: caller is not authorized issuer"
        );
        _;
    }
    
    // ============ Constructor ============
    
    constructor(address initialOwner) {
        require(initialOwner != address(0), "TrustScoreRegistry: initial owner is zero address");
        owner = initialOwner;
        authorizedIssuers[initialOwner] = true;
        
        // Register default badge types
        _registerBadgeType("verified_builder", "Verified Builder");
        _registerBadgeType("opn_participant", "OPN Participant");
        _registerBadgeType("active_defi", "Active DeFi User");
        _registerBadgeType("low_risk", "Low Risk Wallet");
        _registerBadgeType("credential_holder", "Credential Holder");
        _registerBadgeType("tx_master", "Transaction Master");
        _registerBadgeType("consistency", "Consistency Champion");
    }
    
    // ============ External Functions ============
    
    /**
     * @notice Update or set the trust score for a wallet
     * @param wallet The wallet address to score
     * @param score Trust score from 0 to 100
     * @param riskLevel Risk classification string
     * @param metadataURI IPFS URI for extended score data
     */
    function updateScore(
        address wallet,
        uint256 score,
        string calldata riskLevel,
        string calldata metadataURI
    ) external onlyIssuer {
        require(wallet != address(0), "TrustScoreRegistry: invalid wallet address");
        require(score <= 100, "TrustScoreRegistry: score must be 0-100");
        
        // Track new wallets
        if (trustScores[wallet].timestamp == 0) {
            totalWalletsScored++;
        }
        
        trustScores[wallet] = TrustScore({
            score: score,
            riskLevel: riskLevel,
            issuer: msg.sender,
            timestamp: block.timestamp,
            metadataURI: metadataURI
        });
        
        emit ScoreUpdated(wallet, score, riskLevel, msg.sender, block.timestamp);
    }
    
    /**
     * @notice Award a badge to a wallet
     * @param wallet The wallet to award
     * @param badgeId The badge type identifier
     * @param name Human-readable badge name
     * @param tier Badge tier level
     */
    function awardBadge(
        address wallet,
        string calldata badgeId,
        string calldata name,
        string calldata tier
    ) external onlyIssuer {
        require(wallet != address(0), "TrustScoreRegistry: invalid wallet address");
        
        badges[wallet][badgeId] = Badge({
            badgeId: badgeId,
            name: name,
            tier: tier,
            earned: true,
            timestamp: block.timestamp
        });
        
        emit BadgeAwarded(wallet, badgeId, name, tier, block.timestamp);
    }
    
    /**
     * @notice Revoke a badge from a wallet
     * @param wallet The wallet to revoke from
     * @param badgeId The badge type to revoke
     */
    function revokeBadge(address wallet, string calldata badgeId) external onlyIssuer {
        require(badges[wallet][badgeId].earned, "TrustScoreRegistry: badge not earned");
        
        badges[wallet][badgeId].earned = false;
        badges[wallet][badgeId].timestamp = block.timestamp;
        
        emit BadgeRevoked(wallet, badgeId, block.timestamp);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get the trust score for a wallet
     * @param wallet The wallet to query
     * @return score The trust score (0-100), returns 0 if not scored
     */
    function getScore(address wallet) external view returns (uint256) {
        return trustScores[wallet].score;
    }
    
    /**
     * @notice Get the full trust score data for a wallet
     * @param wallet The wallet to query
     * @return TrustScore struct with all score data
     */
    function getFullScore(address wallet) external view returns (TrustScore memory) {
        return trustScores[wallet];
    }
    
    /**
     * @notice Check if a wallet has earned a specific badge
     * @param wallet The wallet to query
     * @param badgeId The badge type to check
     * @return True if the wallet has earned the badge
     */
    function hasBadge(address wallet, string calldata badgeId) external view returns (bool) {
        return badges[wallet][badgeId].earned;
    }
    
    /**
     * @notice Get badge details for a wallet
     * @param wallet The wallet to query
     * @param badgeId The badge type to query
     * @return Badge struct with badge data
     */
    function getBadge(address wallet, string calldata badgeId) external view returns (Badge memory) {
        return badges[wallet][badgeId];
    }
    
    /**
     * @notice Get all registered badge IDs
     * @return Array of badge ID strings
     */
    function getBadgeIds() external view returns (string[] memory) {
        return badgeIds;
    }
    
    /**
     * @notice Check if an address is an authorized issuer
     * @param issuer The address to check
     * @return True if authorized
     */
    function isAuthorizedIssuer(address issuer) external view returns (bool) {
        return authorizedIssuers[issuer] || issuer == owner;
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Authorize a new score issuer
     * @param issuer The address to authorize
     */
    function authorizeIssuer(address issuer) external onlyOwner {
        require(issuer != address(0), "TrustScoreRegistry: invalid address");
        require(!authorizedIssuers[issuer], "TrustScoreRegistry: already authorized");
        
        authorizedIssuers[issuer] = true;
        emit IssuerAuthorized(issuer);
    }
    
    /**
     * @notice Revoke an issuer's authorization
     * @param issuer The address to revoke
     */
    function revokeIssuer(address issuer) external onlyOwner {
        require(authorizedIssuers[issuer], "TrustScoreRegistry: not authorized");
        
        authorizedIssuers[issuer] = false;
        emit IssuerRevoked(issuer);
    }
    
    /**
     * @notice Register a new badge type
     * @param badgeId Unique identifier for the badge
     * @param name Human-readable name
     */
    function registerBadgeType(string calldata badgeId, string calldata name) external onlyOwner {
        _registerBadgeType(badgeId, name);
    }
    
    /**
     * @notice Transfer contract ownership
     * @param newOwner The new owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "TrustScoreRegistry: invalid address");
        owner = newOwner;
    }
    
    // ============ Internal Functions ============
    
    function _registerBadgeType(string memory badgeId, string memory name) internal {
        if (!registeredBadgeIds[badgeId]) {
            badgeIds.push(badgeId);
            registeredBadgeIds[badgeId] = true;
            emit BadgeTypeRegistered(badgeId, name);
        }
    }
}
