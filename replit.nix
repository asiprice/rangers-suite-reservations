# Nix configuration for Replit environment
{pkgs}: {
  deps = [
    pkgs.nodejs_20
    pkgs.npm-check-updates
    pkgs.sqlite
    pkgs.python3
    pkgs.git
  ];
  
  # Environment variables
  env = {
    REPL_HOME = "$HOME";
    REPL_DATA = "$HOME/data";
  };
}