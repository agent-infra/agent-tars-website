import styled from '@emotion/styled';
import { CircularProgress, IconButton, TextField, Tooltip } from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  Refresh, 
  ContentCopy, 
  Security, 
  Close,
  OpenInNew,
  Share
} from '@mui/icons-material';

const Shell = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #000;
`;

const TopBar = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Circle = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const AddressBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 8px;
`;

const ActionControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
`;

const Content = styled.div<{ $loading?: boolean }>`
  flex: 1;
  background: #fff;
  position: relative;

  ${(props) =>
    props.$loading &&
    `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}

  img, iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

const SecureIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4caf50;
  margin-right: 8px;
  font-size: 12px;
`;

interface BrowserShellProps {
  url: string;
  loading?: boolean;
  children: React.ReactNode;
  onUrlChange?: (url: string) => void;
  onNavigate?: (type: 'back' | 'forward' | 'refresh') => void;
  onClose?: () => void;
  onShare?: () => void;
  title?: string;
}

export function BrowserShell({
  url = 'about:blank',
  loading,
  children,
  onUrlChange,
  onNavigate,
  onClose,
  onShare,
  title,
}: BrowserShellProps) {
  const isSecure = url.startsWith('https://');
  
  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  };
  
  const openInNewTab = () => {
    window.open(url, '_blank');
  };
  
  return (
    <Shell>
      <TopBar>
        <Circle color="#ff5f57" />
        <Circle color="#fdbc2c" />
        <Circle color="#28c840" />

        <AddressBar>
          <NavigationControls>
            <Tooltip title="Back">
              <IconButton size="small" onClick={() => onNavigate?.('back')} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <ArrowBack fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Forward">
              <IconButton size="small" onClick={() => onNavigate?.('forward')} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <ArrowForward fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton size="small" onClick={() => onNavigate?.('refresh')} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
          </NavigationControls>

          {isSecure && (
            <SecureIndicator>
              <Security fontSize="small" />
              Secure
            </SecureIndicator>
          )}

          <TextField
            fullWidth
            size="small"
            value={url}
            onChange={(e) => onUrlChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onNavigate?.('refresh');
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              }
            }}
          />
          
          <ActionControls>
            <Tooltip title="Copy URL">
              <IconButton size="small" onClick={copyUrl} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Open in New Tab">
              <IconButton size="small" onClick={openInNewTab} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <OpenInNew fontSize="small" />
              </IconButton>
            </Tooltip>
            
            {onShare && (
              <Tooltip title="Share">
                <IconButton size="small" onClick={onShare} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <Share fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            
            {onClose && (
              <Tooltip title="Close">
                <IconButton size="small" onClick={onClose} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </ActionControls>
        </AddressBar>
      </TopBar>
      
      {title && (
        <div style={{ 
          padding: '8px 16px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
          color: 'white',
          fontSize: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)'
        }}>
          {title}
        </div>
      )}
      
      <Content $loading={loading}>
        {children}
        {loading && (
          <LoadingOverlay>
            <CircularProgress />
          </LoadingOverlay>
        )}
      </Content>
    </Shell>
  );
}
