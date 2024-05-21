import { Menu } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}
  
export function PersonalMenu({ isOpen, setIsOpen}) {
    const intl = useIntl();
    const navigate = useNavigate();

    const onClick = (e) => {
        setIsOpen(false); // 關閉下拉選單
    
        if (e.key === 'myPost')
          navigate('post/published');
        else if (e.key === 'myCollect')
          navigate('/post/mycollect');
      };
    
      const personalItems = [
        getItem(intl.formatMessage({ id: 'personalbutton.myPost' }), 'myPost'),
        { type: 'divider' },
        getItem(intl.formatMessage({ id: 'personalbutton.myCollect' }), 'myCollect'),
      ];

    
    return (
        <>
        {isOpen &&
          <Menu
            onClick={onClick}
            style={{
              borderRadius: '5px',
              width: '100%',
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={personalItems}
          />
        }
      </>
  
    )
}