import React, { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import authService from '../services/authService'

const HomePage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!authService.getCurrentUser()) {
            navigate("/login")
        }
    }, [])
    return (
        <div style={{ padding: "20px" }}>

            <svg style={{ height: "30px", width: "30px" }} viewbox="0 0 300 300">
                <path>
                    <animate
                        attributeName="d"
                        dur="3000ms"
                        repeatCount="indefinite"
                        keyTimes="0;
                 .0625;
                 .3125;
                 .395833333;
                 .645833333;
                 .833333333;
                 1"
                        calcMode="spline"
                        keySplines="0,0,1,1;
                   .42,0,1,1;
                   0,0,.58,1;
                   .42,0,.58,1;
                   .42,0,.58,1;
                   .42,0,.58,1"

                        values="M 0,0 C 50,0 50,0 100,0 100,50 100,50 100,100
               50,100 50,100 0,100 0,50 0,50 0,0 Z;
                     
               M 0,0 C 50,0 50,0 100,0 100,50 100,50 100,100
               50,100 50,100 0,100 0,50 0,50 0,0 Z; 

               M 50,0 C 75,50 75,50 100,100 50,100 50,100 0,100
               12.5,75 12.5,75 25,50 37.5,25 37.5,25 50,0 Z;

               M 50,0 C 75,50 75,50 100,100 50,100 50,100 0,100
               12.5,75 12.5,75 25,50 37.5,25 37.5,25 50,0 Z;

               M 100,50 C 100,77.6 77.6,100 50,100 22.4,100 0,77.6
               0,50 0,22.4 22.4,0 50,0 77.6,0 100,22.4 100,50 Z;
                     
               M 100,50 C 100,77.6 77.6,100 50,100 22.4,100 0,77.6 
               0,50 0,22.4 22.4,0, 50,0 77.6,0 100,22.4 100,50 Z;
                     
               M 100,100 C 50,100 50,100 0,100 0,50 0,50 0,0
               50,0 50,0 100,0 100,50 100,50 100,100 Z;"/>
                    <animate
                        attributeName="fill"
                        dur="3000ms"
                        repeatCount="indefinite"
                        keyTimes="0;
                 .0625;
                 .3125;
                 .395833333;
                 .645833333;
                 .833333333;
                 1"
                        calcMode="spline"
                        keySplines="0,0,1,1;
                   .42,0,1,1;
                   0,0,.58,1;
                   .42,0,.58,1;
                   .42,0,.58,1;
                   .42,0,.58,1"
                        values="#FFA400;
               #FFA400;
               #FF4E42;
               #FF4E42;
               #0CCE6B;
               #0CCE6B;
               #FFA400;"/>
                </path>
            </svg>

        </div>
    );
}
export default HomePage;