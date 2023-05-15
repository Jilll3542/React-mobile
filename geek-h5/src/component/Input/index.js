import React from 'react'
import styles from "./input.module.scss"
import classNames from 'classnames'

export default function Input({extra,onExtraClick,className,...rest}) {
  return (
    <div className={styles.root}>
        <input type='text' className={classNames("input",className)} {...rest}/>
        {extra ? <div className='extra' onClick={onExtraClick}>{extra}</div>:null}
        
      
    </div>
  )
}
