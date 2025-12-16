.PHONY: help install dev build test clean sync-abis

help:
	@echo "Comandos disponibles:"
	@echo "  make install     - Instala dependencias (frontend + foundry)"
	@echo "  make dev         - Inicia desarrollo frontend"
	@echo "  make build       - Compila contratos"
	@echo "  make test        - Tests de contratos"
	@echo "  make sync-abis   - Sincroniza ABIs al frontend"
	@echo "  make clean       - Limpia builds"

install:
	cd apps/web && pnpm install
	cd foundry && forge install

dev:
	cd apps/web && pnpm dev

build:
	cd foundry && forge build

test:
	cd foundry && forge test -vvv

anvil:
	cd foundry && anvil

sync-abis: build
	@echo "Sincronizando ABIs..."
	@mkdir -p apps/web/lib/contracts
	@cp foundry/out/**/*.json apps/web/lib/contracts/ 2>/dev/null || true
	@echo "✓ ABIs sincronizados"

clean:
	cd foundry && forge clean
	cd apps/web && rm -rf .next
	rm -rf apps/web/lib/contracts/*.json
