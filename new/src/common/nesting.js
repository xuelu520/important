import React from 'react';

import {
	Layout
} from 'antd';

export default class Nesting extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout>
         {this.props.children}
      </Layout>
		);
	}
}