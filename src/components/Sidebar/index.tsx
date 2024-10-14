import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles)

function Sidebar() {
    return <aside className={cx('wrapper')}>
        
        <div className={cx('menu')}>
            <div className={cx('invite-fr')}>
                <div> Lời mời kết bạn</div>
                <div className={cx('more')}>
                    Xem tất cả
                </div>
                
            </div>
            <div className={cx('line')}></div>
            <div className={cx('friend-makers')}>
                <div className={cx('avatar')}>
                    <img src='/asset/img/avatar.jpg' alt='avatar-img' className={cx('avatar-img')} />
                </div>
                <div className={cx('infor')}>
                    <div className={cx('name-time')}>
                        <div className={cx('name')}>Violet Evergarden</div>
                        <div className={cx('time')}> 1 tuần</div>
                    </div>
                    <div className={cx('acp-ref')}>
                        <div className={cx('acp')}> Xác nhận</div>
                        <div className={cx('refuse')}>Hủy</div>
                    </div>
                </div>
            </div>
            <div className={cx('read-more')}>XEM THÊM</div>
        </div>

        
 
        <div className={cx('community')}>
            <div className={cx('title')}>
                <span>My Community</span>
                <div className={cx('number-community')}>

                </div>
            </div>
            <div className={cx('group-items')}>
                <div className={cx('group-img')}>
                    <img src="/asset/img/avatar.jpg" alt="group-img" className={cx('group-item-img')} />
                </div>
                <span>Group1</span>
            </div>
            <div className={cx('group-items')}>
                <div className={cx('group-img')}>
                    <img src="/asset/img/avatar.jpg" alt="group-img" className={cx('group-item-img')} />
                </div>
                <span>Group1</span>
            </div>
            <div className={cx('group-items')}>
                <div className={cx('group-img')}>
                    <img src="/asset/img/avatar.jpg" alt="group-img" className={cx('group-item-img')} />
                </div>
                <span>Group1</span>
            </div>

        </div>

        <hr className={cx('custom-line')}></hr>


    </aside>
}

export default Sidebar;