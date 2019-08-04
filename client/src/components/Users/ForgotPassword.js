import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Forms from '../Forms';
import { Alert, Form, Container, Row, Col } from 'react-bootstrap';

export default class ForgotPassword extends Component {
  state = {
    email: '',
    success: false,
    messageFromServer: '',
    confirmed: true,
  };

  render() {
    const { email, success, messageFromServer, confirmed } = this.state;

    if (!success) {
      return (
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <h1>Forgot Password?</h1>
              <Forms
                cancel={this.cancel}
                errors={messageFromServer}
                submit={this.submit}
                passwordErrors={confirmed}
                submitButtonText="Reset Password"
                elements={() => (
                  <React.Fragment>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email Address"
                        onChange={this.change}
                      />
                    </Form.Group>
                  </React.Fragment>
                )}
              />
              <p>
                Remember your password? <Link to="/signin">Sign In</Link>
              </p>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <Alert variant="success">
                <Alert.Heading>
                  Reset Password Link Successfully Sent
                </Alert.Heading>
                <p>
                  YAY! Your password reset link is heading to your inbox. Make
                  sure you click the link with 24 hours or it will expire.
                </p>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  change = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { email } = this.state;
    context.data
      .forgotUserPassword(email)
      .then(() =>
        this.setState({
          success: true,
        })
      )
      .catch(err => {
        if (err) {
          this.setState(() => {
            return {
              messageFromServer: [
                'Email does not exist in our Database, check your email and try again',
              ],
            };
          });
        }
        console.log(err);
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
