import React from 'react';
import { useIntl } from 'react-intl';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type };
}

function DropdownMenu({ isOpen, setIsOpen, token, navigate, logout }) {
  const intl = useIntl();

  const onClick = (e) => {
    setIsOpen(false); // 關閉下拉選單

    if (e.key === 'member')
      navigate('/member');
    else if (e.key === 'login')
      navigate('/login');
    else if (e.key === 'logout')
      logout();
  };

  const loginItems = [
    getItem(intl.formatMessage({ id: 'header.login' }), 'login'),
  ];

  const notLoginItems = [
    getItem(intl.formatMessage({ id: 'header.member' }), 'member'),
    { type: 'divider' },
    getItem(intl.formatMessage({ id: 'header.logout' }), 'logout'),
  ];

  return (
    <>
      {isOpen &&
        <Menu
          onClick={onClick}
          style={{
            width: 200,
            position: 'absolute',
              top: '100%',
            marginTop: 3,
            transform: 'translateX(-50%)',
            borderRadius: '5px',
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          items={token === null || token === '' ? loginItems : notLoginItems}
        />
      }
    </>
  );
}
export default DropdownMenu;

