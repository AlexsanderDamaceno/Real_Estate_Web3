import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { useContext } from "react";
import HouseCard from './HouseCards.js';

const HouseView = () => 
{

    const houses = [
        {
          id: 1,
          name: 'Modern House',
          description: 'A beautiful modern house with scenic views',
          price: '$500,000',
          imageUrl: 'https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMF9waG90b19vZl9hX21vZGVybl9ob3VzZV9pbl90aGVfY2l0eV9uYXR1cmFsX18yMDdhNWQzOC02M2E5LTRkODItOGU3NC1jYWVlZDU3MzczM2FfMS5qcGc.jpg',
        },
        {
          id: 2,
          name: 'Classic Villa',
          description: 'A classic villa with a spacious garden',
          price: '$700,000',
          imageUrl: 'https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMF9waG90b19vZl9hX21vZGVybl9ob3VzZV9pbl90aGVfY2l0eV9uYXR1cmFsX18yMDdhNWQzOC02M2E5LTRkODItOGU3NC1jYWVlZDU3MzczM2FfMS5qcGc.jpg',
        },
        {
          id: 3,
          name: 'Cozy Cottage',
          description: 'A cozy cottage nestled in the woods',
          price: '$300,000',
          imageUrl: 'https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMF9waG90b19vZl9hX21vZGVybl9ob3VzZV9pbl90aGVfY2l0eV9uYXR1cmFsX18yMDdhNWQzOC02M2E5LTRkODItOGU3NC1jYWVlZDU3MzczM2FfMS5qcGc.jpg',
        },

        {
            id: 4,
            name: 'Cozy Cottage',
            description: 'A cozy cottage nestled in the woods',
            price: '$300,000',
            imageUrl: 'https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMF9waG90b19vZl9hX21vZGVybl9ob3VzZV9pbl90aGVfY2l0eV9uYXR1cmFsX18yMDdhNWQzOC02M2E5LTRkODItOGU3NC1jYWVlZDU3MzczM2FfMS5qcGc.jpg',
          },

          {
            id: 5,
            name: 'Cozy Cottage',
            description: 'A cozy cottage nestled in the woods',
            price: '$300,000',
            imageUrl: 'https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMF9waG90b19vZl9hX21vZGVybl9ob3VzZV9pbl90aGVfY2l0eV9uYXR1cmFsX18yMDdhNWQzOC02M2E5LTRkODItOGU3NC1jYWVlZDU3MzczM2FfMS5qcGc.jpg',
          },

          {
            id: 6,
            name: 'Cozy Cottage',
            description: 'A cozy cottage nestled in the woods',
            price: '$300,000',
            imageUrl: 'https://images.rawpixel.com/image_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMF9waG90b19vZl9hX21vZGVybl9ob3VzZV9pbl90aGVfY2l0eV9uYXR1cmFsX18yMDdhNWQzOC02M2E5LTRkODItOGU3NC1jYWVlZDU3MzczM2FfMS5qcGc.jpg',
          },
      ];

 


 return (



  <div className="container mx-auto">
  <h1 className="text-3xl font-bold mb-4">Available Houses</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {houses.map(house => (
      <HouseCard key={house.id} house={house} />
    ))}
  </div>
</div>



 );


}


export default HouseView; 