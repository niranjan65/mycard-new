import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../constants/colors';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/products?category=${category.name}`}
      style={{
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      <div style={{
        backgroundColor: COLORS.white,
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: COLORS.primaryLight + '20',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          border: `2px solid ${COLORS.primaryLight}40`
        }}>
          <img 
            src={category.image || 'https://via.placeholder.com/80'} 
            alt={category.name}
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'contain'
            }}
          />
        </div>
        <h3 style={{
          margin: '0',
          fontSize: '18px',
          fontWeight: '600',
          color: COLORS.textPrimary,
          textAlign: 'center'
        }}>
          {category.item_group_name || category.name}
        </h3>
        <p style={{
          margin: '8px 0 0 0',
          fontSize: '14px',
          color: COLORS.textSecondary,
          textAlign: 'center'
        }}>
          Explore Now
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
