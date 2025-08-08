import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SettingIcon } from "../../../Assets/SVGs/Icons/icon-setting-purple.svg";
import { ReactComponent as BoxIcon } from "../../../Assets/SVGs/Icons/icon-box.svg";
import { ReactComponent as HistoryIcon } from "../../../Assets/SVGs/Icons/icon-history.svg";
import { ReactComponent as ProfileIcon } from "../../../Assets/SVGs/Icons/icon-profile-black.svg";
import { ReactComponent as EmployeIcon } from "../../../Assets/SVGs/Icons/icon-employes.svg";
import ToolTipTab from '../../ToolTipTab';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ANIMATION_DURATION = 500;

const Subnav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(location.pathname.startsWith('/Config'));
  const [animating, setAnimating] = useState(false);

  React.useEffect(() => {
    if (!location.pathname.startsWith('/Config')) setExpanded(false);
    else setExpanded(true);
  }, [location.pathname]);

  const handleConfigClick = (e) => {
    e.preventDefault();
    if (!expanded && !animating) {
      setAnimating(true);
      setExpanded(true);
      setTimeout(() => {
        setAnimating(false);
        navigate('/Config/Stock');
      }, ANIMATION_DURATION);
    }
  };

  const handleHomeClick = (e) => {
    if (expanded && !animating) {
      e.preventDefault();
      setAnimating(true);
      setExpanded(false);
      setTimeout(() => {
        setAnimating(false);
        navigate('/Gallery');
      }, ANIMATION_DURATION);
    }
  };

  const isStock = location.pathname === '/Config/Stock';

  return (
    <StyledWrapper>
      <div className={`navigation-card${expanded ? ' expanded' : ''}${animating ? ' animating' : ''}`}>
        <ToolTipTab label={"Galeria"}>
          <Link
            className={`tab ${location.pathname === '/Gallery' ? 'active' : ''}`}
            to="/Gallery"
            onClick={handleHomeClick}
            tabIndex={animating ? -1 : 0}
            style={animating ? { pointerEvents: "none" } : {}}
          >
            <svg className="svgIcon" viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100.5 40.75V96.5H66V68.5V65H62.5H43H39.5V68.5V96.5H3.5V40.75L52 4.375L100.5 40.75Z" stroke="currentColor" strokeWidth={7} />
            </svg>
          </Link>
        </ToolTipTab>

        {expanded ? (
          <ToolTipTab label="Estoque">
            <Link
              className={`tab${isStock ? ' active' : ''}`}
              to="/Config/Stock"
              tabIndex={animating ? -1 : 0}
              style={animating ? { pointerEvents: "none" } : {}}
            >
              <BoxIcon className="svgIcon" />
            </Link>
          </ToolTipTab>
        ) : (
          <ToolTipTab label="Configurações">
            <Link
              className={`tab`}
              href="#"
              onClick={handleConfigClick}
              tabIndex={animating ? -1 : 0}
              style={animating ? { pointerEvents: "none" } : {}}
            >
              <SettingIcon className="svgIcon" fill='currentColor' />
            </Link>
          </ToolTipTab>
        )}

        {expanded && (
          <div className="config-menu">
            <ToolTipTab label="Funcionários">
              <Link
                className={`tab ${location.pathname === '/Config/Employe' ? 'active' : ''}`}
                to="/Config/Employe"
                tabIndex={animating ? -1 : 0}
                style={animating ? { pointerEvents: "none" } : {}}
              >
                <EmployeIcon className="svgIcon" fill='currentColor' />
              </Link>
            </ToolTipTab>
            <ToolTipTab label="Histórico">
              <Link
                className={`tab ${location.pathname === '/Config/History' ? 'active' : ''}`}
                to="/Config/History"
                tabIndex={animating ? -1 : 0}
                style={animating ? { pointerEvents: "none" } : {}}
              >
                <HistoryIcon className="svgIcon" />
              </Link>
            </ToolTipTab>
            <ToolTipTab label="Perfil">
              <Link
                className={`tab ${location.pathname === '/Config/Profile' ? 'active' : ''}`}
                to="/Config/Profile"
                tabIndex={animating ? -1 : 0}
                style={animating ? { pointerEvents: "none" } : {}}
              >
                <ProfileIcon className="svgIcon" />
              </Link>
            </ToolTipTab>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .navigation-card {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    background-color: #000000;
    padding: 15px 20px;
    border-radius: 50px;
    position: fixed;
    bottom: 25px;
    left: 50%;
    box-shadow: 0 1px 2px #623bda;
    transform: translateX(-50%);
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .navigation-card.expanded {
    gap: 20px;
    padding: 15px 35px;
    border-radius: 30px;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .navigation-card.animating {
    filter: brightness(1.05);
  }
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    overflow: hidden;
    background-color: #252525;
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s;
    color: #623bda;
  }
  .tab:hover {
    box-shadow: 0 0 10px #623bda;
  }
  .tab.active {
    background-color: #623bda;
    box-shadow: 0 0 10px #623bda;
    .svgIcon {
      color: black;
    }
  }
  .config-menu {
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s;
  }
`



export default Subnav;
