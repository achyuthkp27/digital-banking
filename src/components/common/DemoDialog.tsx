'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface DemoDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoDialog({ open, onClose }: DemoDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'var(--bg-surface)',
            border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
            borderRadius: 3,
            backgroundImage: 'none',
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>Request a Demo</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Fill this out and we&apos;ll get back to you within 24 hours.
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'var(--text-primary)' }} aria-label="Close">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 3 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }} onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField fullWidth label="First Name" variant="outlined" size="small" required
              slotProps={{
                inputLabel: { sx: { color: 'text.secondary' } },
                input: { sx: { color: 'var(--text-primary)', bgcolor: 'rgba(var(--color-invert-rgb), 0.03)', borderRadius: 1.5, '& fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.1)' }, '&:hover fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.2)' } } },
              }}
            />
            <TextField fullWidth label="Last Name" variant="outlined" size="small" required
              slotProps={{
                inputLabel: { sx: { color: 'text.secondary' } },
                input: { sx: { color: 'var(--text-primary)', bgcolor: 'rgba(var(--color-invert-rgb), 0.03)', borderRadius: 1.5, '& fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.1)' }, '&:hover fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.2)' } } },
              }}
            />
          </Box>
          <TextField fullWidth label="Work Email" type="email" variant="outlined" size="small" required
            slotProps={{
              inputLabel: { sx: { color: 'text.secondary' } },
              input: { sx: { color: 'var(--text-primary)', bgcolor: 'rgba(var(--color-invert-rgb), 0.03)', borderRadius: 1.5, '& fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.1)' }, '&:hover fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.2)' } } },
            }}
          />
          <TextField fullWidth label="Company Name" variant="outlined" size="small" required
            slotProps={{
              inputLabel: { sx: { color: 'text.secondary' } },
              input: { sx: { color: 'var(--text-primary)', bgcolor: 'rgba(var(--color-invert-rgb), 0.03)', borderRadius: 1.5, '& fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.1)' }, '&:hover fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.2)' } } },
            }}
          />
          <FormControl fullWidth size="small">
            <InputLabel sx={{ color: 'text.secondary' }}>Product Interest</InputLabel>
            <Select
              label="Product Interest"
              defaultValue=""
              sx={{ color: 'var(--text-primary)', bgcolor: 'rgba(var(--color-invert-rgb), 0.03)', borderRadius: 1.5, '& fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.1)' }, '&:hover fieldset': { borderColor: 'rgba(var(--color-invert-rgb), 0.2)' } }}
            >
              <MenuItem value="video-kyc">Video KYC</MenuItem>
              <MenuItem value="kiosk">Kiosk Banking</MenuItem>
              <MenuItem value="agent">Agent Banking</MenuItem>
              <MenuItem value="merchant">Merchant Banking</MenuItem>
              <MenuItem value="corporate">Corporate Banking</MenuItem>
              <MenuItem value="mobile">Mobile Banking</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: 'primary.main',
              color: '#000',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 999,
              mt: 1,
              '&:hover': { filter: 'brightness(1.1)', bgcolor: 'primary.main' },
            }}
          >
            Submit Request
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
