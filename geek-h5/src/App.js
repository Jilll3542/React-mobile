import {Button,Modal} from "antd-mobile" 

export default function index() {
  const test = ()=>{
    Modal.alert({
      content: '人在天边月上明',
      onConfirm: () => {
        console.log('Confirmed')
      },
    })
  }
  return (
    <div>
         <Button color='primary' fill='outline' onClick={test}>
            Outline
          </Button>
    </div>
  )
}