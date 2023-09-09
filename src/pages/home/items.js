import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

export const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to={"/"}>Feed</Link>,
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Explore',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Message',
    },
    {
      key: '4',
      icon: <UploadOutlined />,
      label: 'Direct',
    },
    {
      key: '5',
      icon: <UploadOutlined />,
      label: 'Status',
    },
    {
      key: '6',
      icon: <UploadOutlined />,
      label: 'Settings',
    },
    
]