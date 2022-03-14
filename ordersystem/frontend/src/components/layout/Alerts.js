import React, {Component, Fragment} from 'react';
import {withAlert} from "react-alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error ,alert ,message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if (error.msg.price) alert.error(`Price: ${error.msg.price.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
        }

        if (message !== prevProps.message) {
            if (message.productDeleted) alert.success(message.productDeleted)
            if (message.productCreated) alert.success(message.productCreated)
        }
    }

    render() {
        return (
            <Fragment />
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));