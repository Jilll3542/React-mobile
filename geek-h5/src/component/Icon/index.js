import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
 function Icon({type,className,...rest}) {
  return (
    <div>
       <svg 
            className={classNames("icon",className)} 
            aria-hidden="true" 
           {...rest}
        >
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </div>
  )
}
//校验
Icon.protoTypes = {
    type:PropTypes.string.isRequired,
}
export default Icon
