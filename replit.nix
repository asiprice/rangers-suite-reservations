# Nix configuration for Replit environment
{pkgs}: {
  deps = [
    pkgs.nodejs_20
    pkgs.npm-check-updates
    pkgs.sqlite
    pkgs.python3
    pkgs.git
    pkgs.gcc
    pkgs.gnumake
    pkgs.pkg-config
  ];
  
  # Environment variables
  env = {
    REPL_HOME = "$HOME";
    REPL_DATA = "$HOME/data";
    # Help npm rebuild native modules
    npm_config_build_from_source = "true";
    npm_config_cache = "$HOME/.npm";
  };
}