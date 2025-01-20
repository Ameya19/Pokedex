import React from 'react';
import './footer.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

function footer() {
    return(
        <div className="footer">
                <p>Made by Ameya with love <FavoriteIcon fontSize='small'/>. </p>
        </div>
    );
}

export default footer;