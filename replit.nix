# Nix configuration for Replit environment
{pkgs}: {
  deps = [
    pkgs.nodejs_20
    pkgs.sqlite
    pkgs.git
    pkgs.python311  # Use Python 3.11 which has distutils
    pkgs.gcc
    pkgs.gnumake
    pkgs.pkg-config
  ];
  
  # Environment variables
  env = {
    REPL_HOME = "$HOME";
    REPL_DATA = "$HOME/data";
    PYTHON = "${pkgs.python311}/bin/python3";
  };
}