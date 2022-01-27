import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingStartMenu:React.FC = () => {
  const borderRadius = 5
  const radiusObj = {
    rx: borderRadius,
    ry: borderRadius,
  }
  const backgroundColor = '#ccc'
  const foregroundColor = '#aaa'

  return (
    <div className="quiz__container">
      <ContentLoader style={{
        position: 'relative',
        left:'50%',
        width: 250,
        height: 23,
        transform:'translateX(-50%)',
        marginBottom: '10px',
      }}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      >
        <rect x='0' y='0' rx='7' ry='7' width='250' height='23' />
      </ContentLoader>
        <div className="quizInfo__wrapper">
          {/* left half */}
          <ContentLoader
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            style={{
              width: '50%'
            }}
          >
            <rect x="0" y="0" {...radiusObj} width="96%" height="20" />
            <rect x="0" y="35" {...radiusObj} width="50%" height="20" />
            <rect x="15" y="65" {...radiusObj} width="50%" height="20" />
            <rect x="15" y="95" {...radiusObj} width="50%" height="20" />
            <rect x="15" y="125" {...radiusObj} width="50%" height="20" />
          </ContentLoader>
          
          {/* righthalf */}
          <ContentLoader
            rtl
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            style={{
              width: '50%'
            }}
          >
            <rect x="0" y="0" {...radiusObj} width="96%" height="20" />
            <rect x="0" y="30" {...radiusObj} width="65%" height="20" />
            <rect x="0" y="60" {...radiusObj} width="50%" height="20" />
            <rect x="0" y="90" {...radiusObj} width="35%" height="20" />
            <rect x="calc(50% + 10px)" y="120" rx={borderRadius-2} ry={borderRadius-2} width="25%" height="30" />
            <rect x="0" y="120" rx={borderRadius-2} ry={borderRadius-2} width="50%" height="30" />
          </ContentLoader>
        </div>
    </div>
  )
}

export default LoadingStartMenu;
