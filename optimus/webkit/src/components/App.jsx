import React, { Component } from 'react';
import Login from './Login/Login';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
let DevTools;
if (__DEV__ && __COMPONENT_DEVTOOLS__) {
    // 组件形式的 Redux DevTools
    DevTools = require('COMPONENT/DevTools').default
};

let App;
let loginCookie = sessionStorage.getItem('username');
if (!loginCookie) {
    App = Login;
} else {
    App = class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true
            }
        }

        componentDidMount() {
            this.setState({
                loading: false
            });
        }

        render() {
            return (
                <div className="wrapper">
                    <Header />
                    <Sidebar />
                    <div className="content-wrapper">
                        <section className="content">
                            <div style={{ minHeight: '100%' }}>
                                { this.props.children }
                            </div>
                            <footer className="main-footer">
                                <span>网易公司版权所有 © 1997-2017</span>
                            </footer>
                        </section>
                    </div>
                    { DevTools && <DevTools /> }
                </div>
            )
        }
    }
}
export default App;
