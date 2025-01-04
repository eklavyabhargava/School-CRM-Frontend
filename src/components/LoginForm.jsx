import { Button, Form } from "rsuite";

const LoginForm = ({ formValue, setFormValue, loading, handleLogin }) => {
  return (
    <Form fluid onChange={(value) => setFormValue(value)} formValue={formValue}>
      <Form.Group>
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="username" type="text" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" />
      </Form.Group>
      <Button
        appearance="primary"
        loading={loading}
        onClick={handleLogin}
        style={{ marginTop: "10px" }}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
