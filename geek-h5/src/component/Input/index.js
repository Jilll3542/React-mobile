import React from 'react'
import styles from "./input.module.scss"

export default function Input({extra,onExtraClick,...rest}) {
  return (
    <div className={styles.root}>
        <input type='text' className='input' {...rest}/>
        {extra && <div className='extra' onClick={onExtraClick}>{extra}</div>}
        
      
    </div>
  )
}
