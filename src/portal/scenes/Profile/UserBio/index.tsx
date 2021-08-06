import styles from './styles.module.scss';
import {IoCaretBack, MdEdit } from 'react-icons/all';
import { useHistory } from 'react-router';
import { Modal } from 'portal/scenes/Modal';
import { UpdateModal } from '../UpdateModal';
import { useState } from 'react';
import { useAuth, useAvatar } from 'store/useAuth';
export const UserBio = () => {
    const [ toggleEdit, setToggleEdit ] = useState(false)
    const { push } = useHistory()
    const { user } = useAuth()
    const { avatar } = useAvatar()

    if(!user) return null;
    return (
      <div className={styles.pageContent}>
          <div className={styles.visualBlock}>
           <div className={styles.userInfo}>
               <div className={styles.navLinks}>
                   <a className={styles.left}
                    onClick={event => {
                        event.preventDefault()
                        push("/")
                    }}
                   >
                       <IoCaretBack size={18}/>
                       <span className={styles.spanPadding} >Back</span>
                   </a>

                   <a className={styles.right}
                    onClick = {event => {
                      event.preventDefault();
                      setToggleEdit(!toggleEdit)
                    }}
                   >

                       <MdEdit size={16}/>
                       <span className={styles.spanPadding} >Edit Profile</span>
                   </a>
                   
               </div>
               <div className={styles.container}>
                   <div className={styles.photo}>
                       <img src={avatar ? avatar : process.env.PUBLIC_URL + '/img/avatar-photo.png'} />
                   </div>
                   <div className={styles.about}>
                       <div className={styles.headlineInfo}>
                           <h1>{user.first_name ?  `${user.first_name} ${user.last_name}`: user.username}</h1>
                       </div>
                   </div>
               </div>
           </div>
          </div>
        { toggleEdit && <Modal >
              <UpdateModal  onClose={() => setToggleEdit(!toggleEdit)}/>
          </Modal>}
      </div>
    );
}
