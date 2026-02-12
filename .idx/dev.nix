{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # Instala o Node.js (necessário para seu package.json)
    pkgs.nodejs_22
  ];

  # Sets environment variables in the workspace
  env = {};
  
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vue.volar" # Exemplo: ative extensões úteis aqui se precisar
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # Configuração do Preview Web para Vite
        web = {
          # Roda o comando 'npm run dev' injetando a porta e host corretos
          command = [ "npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0" ];
          manager = "web";
          env = {
            # Variáveis de ambiente opcionais para o preview
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Instala as dependências automaticamente ao criar o workspace
        npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Garante que as dependências estejam instaladas ao iniciar
        npm-install = "npm install";
      };
    };
  };
}
