import React, { useEffect } from 'react';
import Star from './Star';
import axios from 'axios';
import Config from '../../Config';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';

export default function StarRating({ context, recid }) {
  // Initialize a 'rating' state

  const [userRating, setUserRating] = useStateWithCallback(0, userRating => {
    if (userRating > 0) {
      updateRating();
    }
  });

  const getUserRating = async () => {
    console.log(context.authorizedUser.id);
    const res = await axios.get(`${Config.apiBaseUrl}/rating`, {
      headers: { Authorization: 'bearer ' + context.token },
    });
    console.log(res.data);
    return res.data;
  };

  useEffect(() => {
    getUserRating();
  }, []);

  const updateRating = async () => {
    const data = {
      rate: userRating,
    };

    if ((await getUserRating().length) > 0) {
      await axios.put(`${Config.apiBaseUrl}/rating/recs/${recid}`, data, {
        headers: { Authorization: 'bearer ' + context.token },
      });
    }
    await axios.post(`${Config.apiBaseUrl}/rating/recs/${recid}`, data, {
      headers: { Authorization: 'bearer ' + context.token },
    });
  };

  //function that returns 5 Star components

  const renderStars = () => {
    let stars = [];
    let maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <Star
          isSelected={userRating > i}
          setRating={() => handleSetRating(i + 1)}
          key={i}
        />
      );
    }
    return stars;
  };

  // event handler that updates the rating state.
  const handleSetRating = rating => {
    if (userRating === rating) {
      setUserRating(0);
    } else {
      setUserRating(rating);
    }
  };

  // Pass the function to a Star component via props

  return <ul className="stars">{renderStars()}</ul>;
}
