import http.server
import socketserver
import webbrowser
import os

# Changer vers le répertoire du projet
os.chdir(r'C:\Users\Alice\Desktop\minecraft\doc SAO')

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Ajouter des headers CORS pour permettre le chargement des images
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Serveur démarré sur http://localhost:{PORT}")
        print("Ouvrez http://localhost:8000/test_map.html pour tester")
        print("Ou http://localhost:8000/map.html pour la carte complète")
        print("Appuyez sur Ctrl+C pour arrêter le serveur")
        
        # Ouvrir automatiquement le navigateur
        webbrowser.open(f'http://localhost:{PORT}/test_map.html')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServeur arrêté.")
