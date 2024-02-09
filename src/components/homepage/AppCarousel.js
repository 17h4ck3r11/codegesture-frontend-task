import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';

// var heroData = [
//   {
//     id: 0,
//     image: 'https://siet.in/Uploads/PlacementBanners/PLC00087.jpg'
//   },
//   {
//     id: 1,
//     image: 'https://siet.in/Uploads/PlacementBanners/PLC00086.jpg'
//   },
//   {
//     id: 2,
//     image: 'https://siet.in/Uploads/PlacementBanners/PLC00078.jpg'
//   },
//   {
//     id: 3,
//     image: 'https://siet.in/Uploads/PlacementBanners/PLC00080.jpg'
//   },
//   {
//     id: 4,
//     image: 'https://siet.in/Uploads/PlacementBanners/PLC00081.jpg'
//   },
//   {
//     id: 5,
//     image: "https://siet.in/Uploads/PlacementBanners/PLC00084.jpg"
//   },
//   {
//     id: 6,
//     image: "https://siet.in/Uploads/PlacementBanners/PLC00083.jpg"
//   },
//   {
//     id: 7,
//     image: "https://siet.in/Uploads/PlacementBanners/PLC00082.jpg"
//   },
//   {
//     id: 8,
//     image: 'https://siet.in/Uploads/PlacementBanners/PLC00088.jpg'
//   }
// ]

function AppCarousel() {
    const [heroData, setheroData] = useState([]);

    const getData = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`,{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });

        result = await result.json();
        setheroData(result);
    }

    useEffect(() => {
        getData();
    }, [])

  return (
    <div className='placementCarousel'>
      <Carousel>
          {
            heroData.map(hero => {
              return (
                <Carousel.Item key={hero.id}>
                  <img
                    className="d-block w-100"
                    src={hero.image}
                    alt={"slide " + hero.id}
                    style={{width:'100%',  height:"100%"}}
                  />    
                </Carousel.Item>
              );
            })
          }
      </Carousel>
    </div>
  )
}

export default AppCarousel
