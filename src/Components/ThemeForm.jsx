export default function ThemeForm({ themes, onSelectTheme }) {
  return (
    <>
      <form>
        <select
          name="selectedTheme"
          id="selectedTheme"
          onChange={(e) => onSelectTheme(e.target.value)}
        >
          {themes.map((theme) => {
            return (
              <option key={theme.id} value={theme.name}>
                {theme.name}
              </option>
            );
          })}
        </select>
      </form>
      ;
    </>
  );
}
