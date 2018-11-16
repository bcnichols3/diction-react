import React, { PureComponent } from 'react';

/* -----------------    COMPONENT     ------------------ */

export default class Node extends PureComponent {
    render() {
        return (
			<section>
				{this.props.children}
			</section>
        );
    }
}
