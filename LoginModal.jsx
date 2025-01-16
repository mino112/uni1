import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, Code, User } from 'lucide-react';

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    width: '90%',
    maxWidth: '95%',
    margin: '0 10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  buttonContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    display: 'flex',
    gap: '15px',
    zIndex: 100,
  },
  userIconContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  userIconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200ea',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '50px',
    right: '0',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: '10px 15px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  dropdownItemHover: {
    backgroundColor: '#6200ea',
    color: '#fff',
  },
  logo: {
    position: 'fixed',
    top: '20px',
    left: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    zIndex: 100,
  },
  logoIcon: {
    color: '#00e5ff',
  },
  logoText: {
    color: '#333',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: '16px',
  },
  input: {
    width: '88%',
    padding: '12px',
    paddingLeft: '40px',
    border: '1px solid #eee',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  inputHover: {
    borderColor: '#6200ea',
    boxShadow: '0 0 5px rgba(98, 0, 234, 0.5)',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#00e5ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    marginTop: '20px',
    marginBottom: '20px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0099cc',
  },
  submitButtonActive: {
    transform: 'scale(0.98)',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px',
    marginBottom: '16px',
  },
  forgotPassword: {
    color: '#00e5ff',
    textAlign: 'right',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'block',
    marginTop: '8px',
    cursor: 'pointer',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#eee',
  },
  orText: {
    margin: '0 10px',
    color: '#666',
    fontSize: '14px',
  },
  socialButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '20px',
  },
  socialButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  signupText: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '14px',
    color: '#666',
  },
  signupLink: {
    color: '#00e5ff',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
      <div style={styles.modalOverlay} onClick={onClose}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
  );
};

const UserDropdown = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    setDropdownOpen(false);
  };

  return (
      <div style={styles.userIconContainer} onClick={toggleDropdown}>
        <div style={styles.userIconButton}>{user.name[0]}</div>
        {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              <div style={styles.dropdownItem} onClick={handleLogout}>
                로그아웃
              </div>
            </div>
        )}
      </div>
  );
};

const LoginModal = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
      setUser({ name: userName });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const rememberMe = e.target.remember.checked;

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
        rememberMe
      });

      const { token, name } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', name);
      setUser({ name });
      setLoginModalOpen(false);
    } catch (error) {
      alert('로그인에 실패했습니다.');
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/users/signup', {
        name,
        email,
        password
      });

      alert('회원가입이 완료되었습니다.');
      setSignupModalOpen(false);
      setLoginModalOpen(true);
    } catch (error) {
      alert('회원가입에 실패했습니다.');
      console.error('Signup error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUser(null);
  };

  return (
      <div>
        <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
            style={styles.logo}
        >
          <Code size={24} style={styles.logoIcon} />
          <span style={styles.logoText}>CodeSchooler</span>
        </a>

        <div style={styles.buttonContainer}>
          {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
          ) : (
              <>
                <button
                    onClick={() => setLoginModalOpen(true)}
                    style={styles.loginButton}
                >
                  로그인
                </button>
                <button
                    onClick={() => setSignupModalOpen(true)}
                    style={styles.signupButton}
                >
                  회원가입
                </button>
              </>
          )}
        </div>

        <Modal
            isOpen={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
        >
          <div>
            <h1 style={styles.title}>로그인</h1>
            <form onSubmit={handleLogin}>
              <div style={styles.inputWrapper}>
                <Mail style={styles.icon} size={20} />
                <input
                    name="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    style={styles.input}
                    required
                />
              </div>
              <div style={styles.inputWrapper}>
                <Lock style={styles.icon} size={20} />
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    style={styles.input}
                    required
                />
                <div
                    onClick={() => setShowPassword(!showPassword)}
                    style={{...styles.icon, left: 'auto', right: '12px', cursor: 'pointer'}}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              <div style={styles.rememberMe}>
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">REMEMBER ME</label>
              </div>
              <button type="submit" style={styles.submitButton}>로그인</button>
              <div style={styles.signupText}>
                계정이 없으신가요? <span style={styles.signupLink} onClick={() => {
                setLoginModalOpen(false);
                setSignupModalOpen(true);
              }}>회원가입</span>
              </div>
              <a
                  href="/forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('비밀번호 찾기 기능은 준비중입니다.');
                  }}
                  style={styles.forgotPassword}
              >
                비밀번호를 잃어버리셨나요?
              </a>
            </form>
          </div>
        </Modal>

        <Modal
            isOpen={signupModalOpen}
            onClose={() => setSignupModalOpen(false)}
        >
          <div>
            <h1 style={styles.title}>회원가입</h1>
            <form onSubmit={handleSignup}>
              <div style={styles.inputWrapper}>
                <User style={styles.icon} size={20} />
                <input
                    name="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    style={styles.input}
                    required
                />
              </div>
              <div style={styles.inputWrapper}>
                <Mail style={styles.icon} size={20} />
                <input
                    name="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    style={styles.input}
                    required
                />
              </div>
              <div style={styles.inputWrapper}>
                <Lock style={styles.icon} size={20} />
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    style={styles.input}
                    required
                />
                <div
                    onClick={() => setShowPassword(!showPassword)}
                    style={{...styles.icon, left: 'auto', right: '12px', cursor: 'pointer'}}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              <div style={styles.inputWrapper}>
                <Lock style={styles.icon} size={20} />
                <input
                    name="passwordConfirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력하세요"
                    style={styles.input}
                    required
                />
              </div>
              <button type="submit" style={styles.submitButton}>회원가입</button>
              <div style={styles.signupText}>
                이미 계정이 있으신가요? <span style={styles.signupLink} onClick={() => {
                setSignupModalOpen(false);
                setLoginModalOpen(true);
              }}>로그인</span>
              </div>
            </form>
          </div>
        </Modal>
      </div>
  );
};

export default LoginModal;
