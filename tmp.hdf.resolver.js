class TMP_HDF_RESOLVER {

    constructor() {
        this.state = "INIT";
        this.revision = 0;
        this.transistor = "OFF";
        console.log("[HDF-RESPO] Resolver v2 aktiv");
    }

    // Transistor schalten
    toggleTransistor() {
        this.transistor = this.transistor === "OFF" ? "ON" : "OFF";
        console.log(`[HDF] Transistor → ${this.transistor}`);
    }

    // Revision erhöhen (max 6)
    nextRevision() {
        this.revision = (this.revision + 1) % 6;
        console.log(`[HDF] Revision → ${this.revision}`);
    }

    // Haupt-Resolver
    async resolve(file, content) {

        // 1) Auftrag extrahieren (#TAG)
        const match = content.match(/#([A-Z0-9]+)/);
        if (!match) {
            console.log(`[HDF] Kein Auftrag in ${file}`);
            return;
        }

        const target = match[1];

        // 2) Räume erkennen (81.room / 9.room / COMMANDS.room / one.room)
        const room = this.detectRoom(content);

        // 3) Transistor schalten
        this.toggleTransistor();

        // 4) Revision erhöhen
        this.nextRevision();

        // 5) Edition erzeugen
        const edition = `${target}.rev${this.revision}.hdf`;

        // 6) Ausgabe erzeugen
        console.log(`[HDF] Auftrag erkannt: ${target}`);
        console.log(`[HDF] Raum: ${room}`);
        console.log(`[HDF] Edition: ${edition}`);
        console
