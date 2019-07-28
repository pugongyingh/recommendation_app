import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import { Form, Container, Row, Col } from 'react-bootstrap';

export default class UserSignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: '',
    confirmed: true,
  };

  render() {
    const { email, password, errors, confirmed } = this.state;

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <h1>Sign In</h1>

            <UserForm
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              passwordErrors={confirmed}
              submitButtonText="Sign In"
              elements={() => (
                <React.Fragment>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      placeholder="name@example.com"
                      onChange={this.change}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      placeholder="password"
                      onChange={this.change}
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            />

            <p>
              Don't have a user account? <Link to="/signup">Click here</Link> to
              sign up!
            </p>
            <p>
              Forgot your password? <Link to="/forgotpassword">Click here</Link>{' '}
              to reset it!
            </p>
          </Col>
        </Row>
      </Container>
    );
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
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { email, password } = this.state;

    context.actions
      .signIn(email, password)
      .then(user => {
        if (user) {
          this.props.history.push(from);
          console.log('User signed In successfully');
        } else {
          this.setState(() => {
            return {
              errors: [
                'Incorrect Email or Password, check your credentials and try again',
              ],
            };
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/errors');
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}