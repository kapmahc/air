import React, {Component} from 'react'
import { Upload, Button, Icon, Row, Col, message } from 'antd'
import i18n from 'i18next'

import Layout from '../../layouts/Dashboard'
import {get, api, _delete} from '../../ajax'
import {TOKEN} from '../../constants'


class Widget extends Component {
  state = { items: []}
  componentDidMount () {
    get('/attachments').then(
      function (rst){
        this.setState({
          items: rst.map((a)=>{
            return {uid:a.id,name:a.title,status:'done',url:a.url}
          })
        })
      }.bind(this)
    )
  }
  handleRemove = (info) => {
    if(window.confirm(i18n.t('are-you-sure'))){
      _delete(`/attachments/${info.uid}`)
        .then((rst)=>{
          message.success(i18n.t('success'))
        })
        .catch(message.error)
      return true
    }
    return false
  }
  handleChange = (info) => {
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-2);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
        file.uid = file.response.uid;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });

    this.setState({ items: fileList });
  }
  render() {
    const props = {
      action: api('/antd/attachments'),
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      multiple: true,
      withCredentials: true,
      headers: {
        // https://github.com/react-component/upload/issues/33
        'X-Requested-With': null,
        'Authorization': `BEARER ${window.sessionStorage.getItem(TOKEN)}`
      },
    };

    return (
      <Layout breadcrumb={[{label: 'auth.attachments.index.title', href: '/attachments'}]}>
        <Row>
          <Col span={8} offset={2}>
            <Upload {...props} fileList={this.state.items}>
              <Button>
                <Icon type="upload" /> {i18n.t('buttons.upload')}
              </Button>
            </Upload>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Widget
