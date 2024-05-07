import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

export const LikeButton = ({ likes, is_liked, pid }) => {

    // const { likes } = this.state;
    return (
        // if (data && data.error) {
        //     // Handle error in data
        //     // console.error('Error in data:', data.error);
        //   } else {
        //     setShowPasswordForm(true);
        //   }
        <div>
            <button onClick={ () => this.setState({ likes: likes + 1 }) }
                src='/icons/heartHollow.png'>
                {/* {likes} */}
            </button>
        </div>
    );
}

export default LikeButton