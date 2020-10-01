export default `
  document.head.insertAdjacentHTML(
    'beforeend',
    \`<style type="text/css">
      .ssa-field-cell {
        border: 1px solid grey;
        border-radius: 0.2rem;
        padding: 0.1rem;
      }
    </>\`
  );
`;
