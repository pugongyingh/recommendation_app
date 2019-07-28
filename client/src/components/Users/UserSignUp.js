import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import { Alert, Form, Container, Row, Col } from 'react-bootstrap';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_conformation: '',
    errors: [],
    confirmed: true,
    sendingEmail: false,
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      password_conformation,
      errors,
      confirmed,
      sendingEmail,
    } = this.state;

    if (sendingEmail) {
      return (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <Alert variant="success">
                <Alert.Heading>Conformation Email Sent</Alert.Heading>
                <p>
                  Thanks for signing up! Check your email, I've sent you a
                  conformation link.
                </p>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <h1>Sign Up</h1>
              <UserForm
                cancel={this.cancel}
                errors={errors}
                passwordErrors={confirmed}
                submit={this.submit}
                submitButtonText="Sign Up"
                elements={() => (
                  <React.Fragment>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={this.change}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={this.change}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email Address"
                        onChange={this.change}
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
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
                    <Form.Group>
                      <Form.Control
                        type="password"
                        name="password_conformation"
                        value={password_conformation}
                        placeholder="confirm password"
                        onChange={this.change}
                      />
                    </Form.Group>
                  </React.Fragment>
                )}
              />

              <p>
                Have an account already? <Link to="/signin">Sign In</Link>
              </p>
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

  // grabs updateUserFunction from context and updates user password.
  submit = () => {
    const { context } = this.props;

    const {
      firstName,
      lastName,
      email,
      password,
      password_conformation,
    } = this.state;

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (password_conformation === password) {
      context.data
        .createUser(user)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            context.data.sendConfirmUserEmail(email);
            this.setState({ sendingEmail: true });

            // .then(data => {
            //   console.log(data);
            //   if (data.status === 200) {
            //     context.actions
            //       .signIn(email, password)
            //       .then(() => this.props.history.push(from));
            //   }
            // });
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    } else {
      this.setState({
        confirmed: false,
      });
    }
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
