import React from 'react'

import {Overlay, Modal} from './ModalBase.styles'
import TweetForm from '../TweetForm'
const ModalBase = () => {
  return (
      <Overlay>
          <Modal>
              
             {/* <TweetForm/> */}
          </Modal>
      </Overlay>
  )
}

export default ModalBase;