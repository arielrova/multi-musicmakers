<template>
    <div class="producer">
        <p>This view will be split in two, one displayed before instruments are added. The other when instrumentation is done.</p>
        <h1>This is producer when initiating the project</h1>
        <p>BPM</p>
        <input type="number" name="quantity" min="100" max="140" value="120">
        <p>KEY</p>
        <select>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="A">A</option>
            <option value="B">B</option>
        </select>
        <p>BEATS</p>
        <select>
            <option value="beat1">Beat1</option>
            <option value="beat2">beat2</option>
            <option value="beat3">beat3</option>
            <option value="beat4">beat4</option>
            <option value="beat5">beat5</option>
        </select>
        <h1>Get back instruments</h1>
        <div>
            <button>Enter view where you add effects to track 1</button>
        </div>
        <div>
            <button>Enter view where you add effects to track 2</button>
        </div>
        <div>
            <button>Playback the master mix</button>
        </div>
        <div>
            <button>Save the mix</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Producer',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.producer {
    border: 1px black solid;
}
</style>
