AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" }
    },
    init: function () {
      this.handleClickEvents();
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
    },
    handeViewState:function(){
      const el = this.el;
      const id = el.getAttribute('id')
      const placesContainer = document.querySelector('#places-container');
      const {selectedItemId} = placesContainer.getAttribute('cursor-listener');
      const sideViewPlacesId = ['place-garden','place-home','place-main_gate']
      if(sideViewPlacesId.includes(id)){
        placesContainer.setAttribute('tour',{
          state:'change-view',
  
        });
        const skyEl= document.querySelector('#main-container')
        skyEl.setAttribute('material',{
          src:`./assets/360_images/${selectedItemId}.jpg`,
          color:'#fff'
  
        })
  
      }
    },
    handleClickEvents: function () {
      //Cursor 'click' Events
      this.el.addEventListener("click", (evt) => {
        const placesContainer = document.querySelector("#places-container");
        const { state } = placesContainer.getAttribute("tour");
  
        if (state === "places-list") {
          const id = this.el.getAttribute("id");
          const placesId = [
            "place-garden",
            "place-main_gate",
            "place-home",
          ];
          if (placesId.includes(id)) {
            placesContainer.setAttribute("tour", {
              state: "view",
              selectedCard: id
            });
  
          }
        }
        if(state==='view'){
          this.handeViewState();
        }
        if(state==='change-view'){
          this.handeViewState();
        }
      });
    },
    handleMouseEnterEvents: function() {
        // Mouse Center Events
        this.el.addEventListener("mouseenter", () => {
        const placeContainer = document.querySelector("#places-container");
        const { state } = placeContainer.getAttribute("tour");
        if (state === "places-list") {
        this.handlePlacesListState();
        }
        });
        },
        handlePlacesListState: function() {
        const id= this.el.getAttribute("id");
        const placesId = ["place-home", "place-garden", "place-main_gate"];
        if (placesId.includes (id)) {
        const placeContainer = document.querySelector("#places-container");
        placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id
        });
        this.el.setAttribute("material", {
        opacity: 1
        });
        };
    },
    handleMouseLeaveEvents: function () {
      //Cursor 'mouseleave' Events
      this.el.addEventListener("mouseleave", () => {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if (id == selectedItemId) {
            el.setAttribute("material", {
              color: "#0077CC",
              opacity: 1,
            });
          }
        }
      });
    },
  
  });
  