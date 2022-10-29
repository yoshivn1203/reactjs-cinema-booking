import React, { useState } from 'react';
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import 'antd/lib/comment/style/index.css';
import generalAvatar from '../../assets/general-avatar.png';
import avatar from '../../assets/avatar.jpg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 0 ? 'bình luận' : ''}`}
    itemLayout='horizontal'
    renderItem={(props) => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
        Thêm Bình Luận
      </Button>
    </Form.Item>
  </>
);
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [commentTime, setCommentTime] = useState();
  const { userInfo } = useSelector((store) => store.user);
  // console.log(comments);
  const navigate = useNavigate();
  const profileImage = userInfo ? avatar : generalAvatar;

  const handleSubmit = () => {
    if (!value) return;
    if (!userInfo) {
      navigate('/sign-in');
      toast('Vui lòng đăng nhập để tiếp tục');
      return;
    }
    setSubmitting(true);
    setCommentTime(Date.now());
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: userInfo.taiKhoan,
          avatar: <Avatar src={profileImage} alt='user' />,
          content: <p>{value}</p>,
          datetime: moment(commentTime).fromNow(),
        },
      ]);
    }, 1000);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Wrapper>
      <div className='small-title'>
        <h3>Đánh Giá</h3>
      </div>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src={profileImage} alt='user' />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  .ant-comment-content-detail {
    /* background-color: var(--primary-white); */
  }
  .ant-comment-content-author-name {
    color: var(--primary-yellow);
  }
  .ant-list-items {
    padding: 1rem 0;
  }
  .ant-comment {
    background-color: var(--lightest-transparent);
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  button {
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    border: 4px solid transparent;
    background-color: var(--primary-yellow);
    color: #fff;
    border-radius: 30px;
    padding: 0.25rem 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    transition: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px 0.3s ease;
    position: relative;
    display: flex;
    justify-content: center;
    &:hover {
      background-color: var(--secondary-yellow);
    }
  }
`;
export default Comments;
