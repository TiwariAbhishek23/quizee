import React from 'react';
import Logo from '../../assets/logo.svg';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
const EducationCard = (props) => {
    const [quiz,setQuiz] = useState({});
    useEffect(() => {
        fetch('')
          .then(res => res.json())
          .then(data => {
            setQuiz(data);
          })
          .catch(error => console.error(error));
      }, []);
    return (
        <div className="college">
            <div className="college-wrapper lg:w-9/12 mx-auto mt-10 p-8 dark:bg-goldenyellow text-black bg-white rounded-4xl text-center border border-solid border-black ">

             <div className="college-pic inline-block my-4">  <Link href={props.alink} target="_blank"> <Image src={Logo} alt="College-name"  height="150" /></Link></div>
                <div className="content">
                {profile.college && (
                    <>
                    <div className="quiz_name font-bold lg:text-2xl text-lg text-center my-4 mx-auto">{quiz.name}</div>
                    <div className="quiz_name font-bold lg:text-2xl text-lg text-center my-4 mx-auto">{quiz.topic}</div>
                    <div className="degree_name font-bold lg:text-2xl text-lg text-center my-4 mx-auto">{quiz.participantCount}</div>
                    <div className="college_timeline font-light text-center text-sm ">{quiz.date} and {quiz.startTime}</div>
                    </>
                )}
                </div>
            </div>
            <style jsx>
                {`

                .college-wrapper:hover{
                    box-shadow: 0 0 60px #1F51FF;
                    border: 0.1rem solid #1F51FF;
                }
                .college-pic:hover{
                    transform: scale(1.09);
                    transition: 2s;
                }
                .college-wrapper:hover{
                    transform: scale(1.09);
                    transition: 2s;
                }          
                `}
            </style>
        </div>


    )
}
export default EducationCard;