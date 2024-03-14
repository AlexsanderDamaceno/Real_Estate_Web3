pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    
    Counters.Counter private tokenIds;
    
    Counters.Counter private HousesSold;
      
    address payable owner;
   
    uint256 HouseUploadPrice = 0.01 ether;


    constructor() ERC721("HouseRealEstate", "NFTM") 
    {
        owner = payable(msg.sender);
    }

     struct HouseToken 
     {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    mapping(uint256 => HouseToken) private idToHouseToken;

    function updateHouseUploadPrice(uint256 _HouseUploadPrice) public payable {
        require(owner == msg.sender, "Only owner can update The House Annunciating price");
        HouseUploadPrice = _HouseUploadPrice;
    }

    function getHouseUploadPrice() public view returns (uint256) {
        return HouseUploadPrice;
    }

     function getLatestIdHouseToken() public view returns (HouseToken memory) {
        uint256 currentTokenId = tokenIds.current();
        return idToHouseToken[currentTokenId];
    }

    function getListedTokenForId(uint256 _tokenId) public view returns (HouseToken memory) {
        return idToHouseToken[_tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return tokenIds.current();
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) 
    {
        
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        
        _safeMint(msg.sender, newTokenId);

       
        _setTokenURI(newTokenId, tokenURI);

        
        createHouseToken(newTokenId, price);

        return newTokenId;
    }

    function createHouseToken(uint256 tokenId, uint256 price) private {
        
        require(msg.value == HouseUploadPrice, "Send the correct House upload value");
    
        require(price > 0, "Price cannot be negative!");

        
        idToHouseToken[tokenId] = HouseToken(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        _transfer(msg.sender, address(this), tokenId);
        
        emit idToHouseToken(
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }


    function getAllHouses() public view returns (ListedToken[] memory)
    {
        uint HouseCount = _tokenIds.current();

        HouseToken[] memory tokens = new ListedToken[](HouseCount);

        uint currentIndex = 0;

        uint currentId;
        

        for(uint i=0;i< HouseCount;i++)
        {
            currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
       
        return tokens;
    }

    function getMyHouse() public view returns (HouseToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        

        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToHouseToken[i+1].owner == msg.sender || idToHouseToken[i+1].seller == msg.sender)
            {
                itemCount += 1;
            }
        }

        
        HouseToken[] memory houses = new HouseToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToHouseToken[i+1].owner == msg.sender || idToHouseToken[i+1].seller == msg.sender) 
            {
                currentId = i+1;
                ListedToken storage currentItem = idToHouseToken[currentId];
                houses[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }


        return houses;
    }
    


}