import type { TemplateResult } from "lit";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import "../../components/ha-card";
import "../../components/ha-settings-row";
import "../../components/ha-switch";
import type { CoreFrontendUserData } from "../../data/frontend";
import { getOptimisticFrontendUserDataCollection } from "../../data/frontend";
import type { HomeAssistant } from "../../types";

@customElement("ha-advanced-mode-row")
class AdvancedModeRow extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  @property({ attribute: false }) public coreUserData?: CoreFrontendUserData;

  protected render(): TemplateResult {
    return html`
      <ha-settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${this.hass.localize("ui.panel.profile.advanced_mode.title")}
        </span>
        <span slot="description">
          ${this.hass.localize("ui.panel.profile.advanced_mode.description")}
          <a
            href="https://www.home-assistant.io/blog/2019/07/17/release-96/#advanced-mode"
            target="_blank"
            rel="noreferrer"
            >${this.hass.localize("ui.panel.profile.advanced_mode.link_promo")}
          </a>
        </span>
        <ha-switch
          .checked=${this.coreUserData && this.coreUserData.showAdvanced}
          .disabled=${this.coreUserData === undefined}
          @change=${this._advancedToggled}
        ></ha-switch>
      </ha-settings-row>
    `;
  }

  private async _advancedToggled(ev) {
    getOptimisticFrontendUserDataCollection(this.hass.connection, "core").save({
      ...this.coreUserData,
      showAdvanced: ev.currentTarget.checked,
    });
  }

  static styles = css`
    a {
      color: var(--primary-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-advanced-mode-row": AdvancedModeRow;
  }
}
