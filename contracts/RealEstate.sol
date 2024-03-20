pragma solidity ^0.8.0;

import "hardhat/console.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract HouseRealEstate is ERC721URIStorage {

    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    Counters.Counter private _HousesSold;
      
    address payable owner;
   
    uint256 _HouseUploadPrice = 0.01 ether;


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

     event HouseTokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );

    mapping(uint256 => HouseToken) private idToHouseToken;

    function updateHouseUploadPrice(uint256 HouseUploadPrice) public payable {
        require(owner == msg.sender, "Only owner can update The House Annunciating price");
        _HouseUploadPrice = HouseUploadPrice;
    }

    function getHouseUploadPrice() public view returns (uint256) {
        return _HouseUploadPrice;
    }

     function getLatestIdHouseToken() public view returns (HouseToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToHouseToken[currentTokenId];
    }

    function getListedTokenForId(uint256 _tokenId) public view returns (HouseToken memory) {
        return idToHouseToken[_tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
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
        
        require(msg.value == _HouseUploadPrice, "Send the correct House upload value");
    
        require(price > 0, "Price cannot be negative!");

        
        idToHouseToken[tokenId] = HouseToken(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        _transfer(msg.sender, address(this), tokenId);
        
       
    }


    function getAllHouses() public view returns (HouseToken[] memory)
    {
        uint HouseCount = _tokenIds.current();

        HouseToken[] memory tokens = new HouseToken[](HouseCount);

        uint currentIndex = 0;

        uint currentId;
        

        for(uint i=0;i< HouseCount;i++)
        {
            currentId = i + 1;
            HouseToken storage currentItem = idToHouseToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
       
        return tokens;
    }

    function getMyHouse() public view returns (HouseToken[] memory)
    {
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
                HouseToken storage currentItem = idToHouseToken[currentId];
                houses[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }


        return houses;
    }


    function executeSale(uint256 tokenId) public payable {

        uint price = idToHouseToken[tokenId].price;
        address seller = idToHouseToken[tokenId].seller;

        require(msg.value == price, "Value send is not the House price!");

        
        idToHouseToken[tokenId].currentlyListed = false;
        idToHouseToken[tokenId].seller = payable(msg.sender);
        _HousesSold.increment();

        
        _transfer(address(this), msg.sender, tokenId);
        
        approve(address(this), tokenId);
       
        payable(owner).transfer(_HouseUploadPrice);
        
        payable(seller).transfer(msg.value);
    }

    


}