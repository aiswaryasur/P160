AFRAME.registerComponent("tour", {
    schema: {
      state: { type: "string", default: "places-list" },
      selectedCard: { type: "string", default: "#card1" },
    },
    init: function() {
      this.placesContainer = this.el;
      this.cameraEl = document.querySelector("#camera");
      this.createPlace();
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.showView();
      }
    },
    showView: function() {
      const { selectedCard } = this.data;
      const skyEl = document.querySelector("#main-container");
      skyEl.setAttribute("material", {
        src: `./assets/360_images/${selectedCard}.jpg`,
        color: "#fff"
      });
    },
    createPlace: function() {
        const details = {
        garden: {
        position: {x: 20, y: 4.5, z: -5.5 },
        rotation: {x: 0, y: 90, z: 0},
        src: "./assets/thumbnails/garden.png",
        title: "Garden",
        id: "place-garden",
        },
        main_gate: {
        position:{x: 4.6, y: 5.5, z: 25 },
        rotation: {x: 180, y: 0, z:0},
        src: "./assets/thumbnails/main_gate.png",
        title: "Main Gate",
        id: "place-main_gate",
        },
        home: {
        position: {x: -9, y: 34, z: -108 },
        rotation: {x: 0, y: 0, z: 0 },
        src: "./assets/thumbnails/home.png",
        title: "My Hone",
        id: "place-home",
        },
    };

        for (var key in details) {
        const item = details[key];
        // Thubnail Element
        const thumbnail = this.createThumbNail(item);
        // Title
        const title = this.createTitleEl(item);
        thumbnail.appendChild(title);
        this.placesContainer.appendChild(thumbnail);
        }
    },

    createThumbNail: function(item) {
        const entityEl = document.createElement("a-entity");
        const id = `place-${item.id}`;
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("id", id);
        entityEl.setAttribute("geometry", {
        primitive: "circle", radius: 3
        });
        entityEl.setAttribute("position", item.position);
        entityEl.setAttribute("rotation", item. rotation);
        entityEl.setAttribute("material", {src: item.src, opacity: 1 }); 
        entityEl.setAttribute("cursor-listener",{});
        return entityEl;
        },
    createTitleEl: function(item) {
      const entityEl = document.createElement("a-entity");
      const id = `title-${item.title}`;
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("id", id);
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 60,
        color: "#e65100",
        value: item.title
      });
      const elPosition = item.position;
      elPosition.y = -20;
      entityEl.setAttribute("position", elPosition);
      entityEl.setAttribute("visible", true);
      return entityEl;
    }, 
    
  });